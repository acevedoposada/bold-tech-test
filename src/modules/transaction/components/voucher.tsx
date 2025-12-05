interface VoucherProps {
  id: string;
}

function Voucher({ id }: VoucherProps) {
  return <div>Voucher {id}</div>;
}

export default Voucher;
