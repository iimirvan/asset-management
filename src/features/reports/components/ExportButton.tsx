"use client";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { queryKeys } from "@/constants/query-keys";
import { logAuditEvent } from "@/features/audit/services/auditService";
import { getReportTitle } from "@/features/reports/services/reportService";
import type { ReportData, ReportFilters } from "@/types/report";

type ExportButtonProps = {
  filters: ReportFilters;
  report: ReportData;
  type: "excel" | "pdf";
};

export function ExportButton({ filters, report, type }: ExportButtonProps) {
  const queryClient = useQueryClient();

  function exportReport() {
    if (type === "excel") {
      exportExcel(filters, report);
      logAuditEvent({
        action: "EXPORT",
        actor: "Report User",
        message: `Excel export generated for ${filters.type}.`,
      });
      void queryClient.invalidateQueries({ queryKey: queryKeys.auditTrail });
      return;
    }

    exportPdf(filters, report);
    logAuditEvent({
      action: "EXPORT",
      actor: "Report User",
      message: `PDF export generated for ${filters.type}.`,
    });
    void queryClient.invalidateQueries({ queryKey: queryKeys.auditTrail });
  }

  return (
    <Button onClick={exportReport} variant="secondary">
      {type === "excel" ? "Export Excel" : "Export PDF"}
    </Button>
  );
}

function exportExcel(filters: ReportFilters, report: ReportData) {
  const title = getReportTitle(filters.type);
  const tableRows = report.rows
    .map(
      (row) =>
        `<tr><td>${row.assetCode}</td><td>${row.assetName}</td><td>${row.category}</td><td>${row.location}</td><td>${row.status}</td><td>${row.purchaseDate}</td><td>${row.purchasePrice}</td><td>${row.currentValue}</td><td>${row.depreciation}</td></tr>`,
    )
    .join("");
  const html = `<table><caption>${title}</caption><thead><tr><th>Asset Code</th><th>Asset Name</th><th>Category</th><th>Location</th><th>Status</th><th>Purchase Date</th><th>Purchase Price</th><th>Current Value</th><th>Depreciation</th></tr></thead><tbody>${tableRows}</tbody></table>`;
  const blob = new Blob([html], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filters.type}.xls`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportPdf(filters: ReportFilters, report: ReportData) {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");

  if (!printWindow) {
    return;
  }

  printWindow.document.write(buildPrintableHtml(filters, report));
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export function buildPrintableHtml(filters: ReportFilters, report: ReportData) {
  const title = getReportTitle(filters.type);
  const rows = report.rows
    .map(
      (row) =>
        `<tr><td>${row.assetCode}</td><td>${row.assetName}</td><td>${row.category}</td><td>${row.location}</td><td>${row.status}</td><td>${row.purchaseDate}</td><td>${row.purchasePrice}</td><td>${row.currentValue}</td><td>${row.depreciation}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><head><title>${title}</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#0f172a}table{border-collapse:collapse;width:100%;font-size:12px}th,td{border:1px solid #e2e8f0;padding:8px;text-align:left}th{background:#f1f5f9}h1{font-size:20px}</style></head><body><h1>${title}</h1><table><thead><tr><th>Asset Code</th><th>Asset Name</th><th>Category</th><th>Location</th><th>Status</th><th>Purchase Date</th><th>Purchase Price</th><th>Current Value</th><th>Depreciation</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
}
