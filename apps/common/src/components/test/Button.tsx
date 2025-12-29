import { Button } from "@heroui/react";

type props = {
  label: string;
};

const MyButtonTest = ({ label }: props) => {
  return <Button>{label}</Button>;
};

export default MyButtonTest;
