interface Props {
  courseName: string;
}

const Header = ({ courseName }: Props) => {
  return <h1>{courseName}</h1>;
};

export default Header;
