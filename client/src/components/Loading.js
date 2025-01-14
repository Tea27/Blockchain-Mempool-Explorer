function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <div
          className="spinner-grow text-primary"
          style={{ width: '2rem', height: '2rem' }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow text-primary"
          style={{ width: '2.25rem', height: '2.25rem' }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow text-primary"
          style={{ width: '2.5rem', height: '2.5rem' }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
