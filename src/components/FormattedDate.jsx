const FormattedDate = ({ date }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return <span>{formattedDate}</span>;
  };
  
  export default FormattedDate;
  