import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertCircle,
  IconFileText,
  IconFolder,
  IconClipboardCheck,
  IconTools,
} from "@tabler/icons-react";
import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard"; // Adjust the import path
import { useStateContext } from "../context"; // Ensure correct import path

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { fetchUserRecords, records, fetchUserByEmail } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    motorSpecifications: 0,
    auditReports: 0,
    completedAudits: 0,
    pendingAudits: 0,
    overdueAudits: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address)
        .then(() => {
          const totalFolders = records.length;
          let motorSpecifications = 0;
          let auditReports = 0;
          let completedAudits = 0;
          let pendingAudits = 0;
          let overdueAudits = 0;

          records.forEach((record) => {
            if (record.auditData) {
              try {
                const audit = JSON.parse(record.auditData);
                motorSpecifications += record.motorSpecs ? 1 : 0;
                auditReports += audit.tasks.length;
                completedAudits += audit.tasks.filter(
                  (task) => task.columnId === "done"
                ).length;
                pendingAudits += audit.tasks.filter(
                  (task) => task.columnId === "doing"
                ).length;
                overdueAudits += audit.tasks.filter(
                  (task) => task.columnId === "overdue"
                ).length;
              } catch (error) {
                console.error("Failed to parse auditData:", error);
              }
            }
          });

          setMetrics({
            totalFolders,
            motorSpecifications,
            auditReports,
            completedAudits,
            pendingAudits,
            overdueAudits,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, fetchUserRecords, records]);

  const metricsData = [
    {
      title: "Total Motor Folders",
      subtitle: "View",
      value: metrics.totalFolders,
      icon: IconFolder,
      onClick: () => navigate("/folders"),
    },
    {
      title: "Motor Specifications",
      subtitle: "View",
      value: metrics.motorSpecifications,
      icon: IconTools,
      onClick: () => navigate("/motor-specifications"),
    },
    {
      title: "Audit Reports",
      subtitle: "View",
      value: metrics.auditReports,
      icon: IconFileText,
      onClick: () => navigate("/audit-reports"),
    },
    {
      title: "Completed Audits",
      subtitle: "View",
      value: metrics.completedAudits,
      icon: IconClipboardCheck,
      onClick: () => navigate("/audits/completed"),
    },
    {
      title: "Pending Audits",
      subtitle: "View",
      value: metrics.pendingAudits,
      icon: IconAlertCircle,
      onClick: () => navigate("/audits/pending"),
    },
    {
      title: "Overdue Audits",
      subtitle: "View",
      value: metrics.overdueAudits,
      icon: IconAlertCircle,
      onClick: () => navigate("/audits/overdue"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;
  