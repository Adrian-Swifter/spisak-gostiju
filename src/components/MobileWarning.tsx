export const MobileWarning = () => {
  return (
    <div className="mobile-warning">
      <div className="warning-box">
        <h1>Potrebno je korišćenje računara</h1>
        <p>
          Naš planer sedenja najbolje funkcioniše na desktop računarima. Molimo
          vas da koristite laptop ili desktop računar kako biste imali punu
          funkcionalnost aplikacije.
        </p>
        <div className="button-group">
          <button
            onClick={() =>
              (window.location.href = "mailto:contact@milosdraskovic.com")
            }
            className="primary-btn"
          >
            Kontaktirajte podršku
          </button>
          <button
            onClick={() => window.location.reload()}
            className="secondary-btn"
          >
            Koristim računar
          </button>
        </div>
      </div>
    </div>
  );
};
