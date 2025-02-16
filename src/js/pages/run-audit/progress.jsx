function Progress({ justCompleted }) {
  return (
    <div>
      <h3 className="text-base font-bold mb-3">Just completed:</h3>
      <div className="inline-flex flex-col-reverse">
        {justCompleted.map((audit, index) => (
          <p key={index}>
            {index + 1}.{" "}
            <a
              href={audit}
              target="_blank"
              className="newtab hover:underline text-base"
            >
              {audit}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Progress;
