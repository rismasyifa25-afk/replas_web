import StatusButton from "../element/Button/Status";

function Tables(props: any) {
  const { children } = props;
  return (
    <>
      <div className="text-[color:var(--text-color)]  w-full h-1/2 rounded-lg border border-[color:var(--primary)] overflow-x-auto">
        <table className="min-w-full">{children}</table>
      </div>
    </>
  );
}

function TableHead(props: any) {
  const { number, name, id, date, price, status } = props;
  return (
    <>
      <thead className="">
        <tr className="text-left border-b border-[color:var(--primary)]">
          <th className="px-4 py-2 w-10 border-r border-[color:var(--primary)]">
            {number}
          </th>
          <th className="px-4 py-2  border-r border-[color:var(--primary)]">
            {name}
          </th>
          <th className="px-4 py-2  border-r border-[color:var(--primary)]">
            {id}
          </th>
          <th className="px-4 py-2  border-r border-[color:var(--primary)]">
            {date}
          </th>
          <th className="px-4 py-2  border-r border-[color:var(--primary)]">
            {price}
          </th>
          <th className="px-4 py-2 ">{status}</th>
        </tr>
      </thead>
    </>
  );
}

function TableBody(props: any) {
  const { number, name, id, date, price, status } = props;
  return (
    <>
      <tbody>
        <tr className="text-left]">
          <td className="px-4 py-2 border-r border-[color:var(--primary)]">{number}</td>
          <td className="px-4 py-2 border-r border-[color:var(--primary)]">{name}</td>
          <td className="px-4 py-2 border-r border-[color:var(--primary)]">{id}</td>
          <td className="px-4 py-2 border-r border-[color:var(--primary)]">{date}</td>
          <td className="px-4 py-2 border-r border-[color:var(--primary)]">{price}</td>
          <td className="px-4 py-2 border-r border-[color:var(--primary)] flex justify-center items-center">
            <StatusButton variant={status} />
          </td>
        </tr>
      </tbody>
    </>
  );
}

Tables.TableHead = TableHead;
Tables.TableBody = TableBody;
export default Tables;
