import { Button } from '@nextui-org/react';

type props = {
  label: string;
};

const MyButtonTest = ({ label }: props) => {
  return <Button>{label}</Button>;
};

export default MyButtonTest;
