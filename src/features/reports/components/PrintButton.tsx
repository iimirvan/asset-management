"use client";

import { Button } from "@/components/ui/button";
import { buildPrintableHtml } from "@/features/reports/components/ExportButton";
import type { ReportData, ReportFilters } from "@/types/report";

type PrintButtonProps = {
  filters: ReportFilters;
  report: ReportData;
};

export function PrintButton({ filters, report }: PrintButtonProps) {
  function printReport() {
    const printWindow = window.open("", "_blank", "noopener,noreferrer");

    if (!printWindow) {
      return;
    }

    printWindow.document.write(buildPrintableHtml(filters, report));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <Button onClick={printReport} variant="secondary">
      Print
    </Button>
  );
}
