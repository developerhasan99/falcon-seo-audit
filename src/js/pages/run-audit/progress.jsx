function Progress({ justCompleted }) {
  return (
    <div className="px-6">
      <h3 className="text-base font-bold mb-3">Just completed:</h3>
      <div className="inline-flex flex-col-reverse">
        {justCompleted.map((audit, index) => (
          <p key={index} className="line-clamp-1">
            {index + 1}.{" "}
            <a
              href={audit.url}
              target="_blank"
              className="newtab hover:underline text-base"
            >
              {audit.url}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Progress;
