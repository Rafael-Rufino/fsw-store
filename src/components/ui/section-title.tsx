interface HeadingProps {
  text: string;
}

const SectionTitle = ({ text }: HeadingProps) => {
  return <strong className="flex pb-2 pl-5 font-bold uppercase">{text}</strong>;
};

export default SectionTitle;
