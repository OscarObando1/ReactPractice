import "./Table.css";

/**
 * Reusable data table driven by a column config. Kept dependency-free so it
 * can be swapped for ag-grid / MUI Table later without touching call sites.
 *
 * @param {object} props
 * @param {Array<{key:string,header:string,render?:(row)=>React.ReactNode,width?:string}>} props.columns
 * @param {Array<object>} props.data
 * @param {(row:object) => string|number} [props.rowKey] - Unique key per row.
 * @param {string} [props.emptyMessage="No data"]
 */
function Table({ columns, data, rowKey, emptyMessage = "No data" }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="table__empty" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={rowKey ? rowKey(row) : i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
