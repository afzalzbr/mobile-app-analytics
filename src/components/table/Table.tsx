import { useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import type { AppSeries } from "../../types";

type TableProps = {
  data: AppSeries[];
  start: string;
  end: string;
  loading?: boolean;
};

const formatNumber = (n: number) => n.toLocaleString();
const formatMoney = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

type Row = {
  id: number | string;
  isTotal?: boolean;
  appName: string;
  icon: string;
  downloads: number;
  revenueCents: number;
  rpd: number | null;
};

export default function Table({ data, start, end, loading = false }: TableProps) {
  const { rowsWithTotal } = useMemo(() => {
    const s = Date.parse(start);
    const e = Date.parse(end);

    const rows: Row[] = data.map((app) => {
      const inRange = app.points.filter((p) => {
        const t = Date.parse(p.date);
        return t >= s && t <= e; // inclusive
      });

      const downloads = inRange.reduce((acc, p) => acc + p.downloads, 0);
      const revenueCents = inRange.reduce((acc, p) => acc + p.revenueCents, 0);
      const rpd = downloads > 0 ? revenueCents / 100 / downloads : null;

      return {
        id: app.id,
        appName: app.name,
        icon: app.icon,
        downloads,
        revenueCents,
        rpd,
      };
    });

    const allPoints = data.flatMap((a) =>
      a.points.filter((p) => {
        const t = Date.parse(p.date);
        return t >= s && t <= e;
      }),
    );
    const totalDownloads = allPoints.reduce((acc, p) => acc + p.downloads, 0);
    const totalRevenueCents = allPoints.reduce((acc, p) => acc + p.revenueCents, 0);
    const totalRpd = totalDownloads > 0 ? totalRevenueCents / 100 / totalDownloads : null;

    const totalsRow: Row = {
      id: "TOTAL",
      isTotal: true,
      appName: "Total",
      icon: "",
      downloads: totalDownloads,
      revenueCents: totalRevenueCents,
      rpd: totalRpd,
    };

    return { rowsWithTotal: [...rows, totalsRow] };
  }, [data, start, end]);

  const columns: GridColDef<Row>[] = [
    {
      field: "appName",
      headerName: "App Name",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const { icon, appName } = params.row;
        return (
          <div className="app-cell">
            {icon ? <img className="app-cell__icon" src={icon} alt="" /> : null}
            <span>{appName}</span>
          </div>
        );
      },
    },
    {
      field: "downloads",
      headerName: "Downloads",
      flex: 0.6,
      type: "number",
      // v7 formatter signature: (value, row, column, apiRef) => string
      valueFormatter: (value) =>
        typeof value === "number" ? formatNumber(value) : "",
    },
    {
      field: "revenueCents",
      headerName: "Revenue",
      flex: 0.6,
      type: "number",
      valueFormatter: (value) =>
        typeof value === "number" ? formatMoney(value) : "",
    },
    {
      field: "rpd",
      headerName: "RPD",
      flex: 0.5,
      type: "number",
      valueFormatter: (value: unknown ) =>
        typeof value === "number"
          ? value?.toLocaleString("en-US", { style: "currency", currency: "USD" })
          : "-",
    },
  ];

  if (data.length === 0) return null;

  return (
    <div className="table-wrapper">
      <DataGrid
        rows={rowsWithTotal}
        columns={columns}
        loading={loading}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        getRowClassName={(params: GridRowClassNameParams<Row>) =>
          params.row.isTotal ? "row-total" : ""
        }
        initialState={{ sorting: { sortModel: [] } }}
        pageSizeOptions={[25, 50, 100]}
        autoHeight
      />
    </div>
  );
}
