import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [gender, setGender] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          flagUrl: `https://flagcdn.com/w80/${country.cca2.toLowerCase()}.png`,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error('Błąd pobierania krajów:', error);
      }
    };

    fetchCountries();
  }, []);

  const validateForm = (event) => {
    event.preventDefault();
    let isValid = true;

    if (firstName.length <= 2) {
      alert('Imię musi mieć więcej niż 2 znaki');
      isValid = false;
    }

    if (lastName.length <= 2) {
      alert('Nazwisko musi mieć więcej niż 2 znaki');
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Niepoprawny adres email');
      isValid = false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Hasło musi być co najmniej 8 znaków, zawierające jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny');
      isValid = false;
    } else if (password !== confirmPassword) {
      alert('Hasła nie są takie same');
      isValid = false;
    }

    if (age < 18 || age > 99) {
      alert('Nieprawidłowy wiek');
      isValid = false;
    }

    const birthYear = new Date().getFullYear();
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const calculatedAge = birthYear - birthYear + birthMonth - birthMonth + birthDay - birthDay;
    if (calculatedAge < 18) {
      alert('Musisz mieć co najmniej 18 lat');
      isValid = false;
    }

    if (!termsAccepted) {
      alert('Musisz zaakceptować regulamin');
      isValid = false;
    }

    if (!gender) {
      alert('Proszę wybrać płeć');
      isValid = false;
    }

    if (!country) {
      alert('Proszę wybrać kraj');
      isValid = false;
    }

    if (isValid) {
      alert('Formularz jest poprawny');
    }

    return isValid;
  };

  return (
    <div className="p-10 h-full bg-white min-h-screen flex justify-center">
      <form className="w-96 md:w-auto bg-gray-100 p-10 rounded-lg shadow-md" onSubmit={validateForm}>
        <h1 className="text-3xl font-bold mb-6 text-center">Rejestracja</h1>

        <label>
          Imię:
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <br />

        <label>
          Nazwisko:
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <br />

        <label>
          Email:
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <br />

        <label>
          Hasło:
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <br />

        <label>
          Potwierdź hasło:
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <br />

        <label>
          Wiek:
          <input
            type="number"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>

        <br />

        <label>
          Data urodzenia:
          <input
            type="date"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={birthDate.toISOString().split('T')[0]}
            onChange={(e) => setBirthDate(new Date(e.target.value))}
          />
        </label>

        <br />

        <label>
          Płeć:
          <div className="flex space-x-4 mt-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            /> Mężczyzna
          </div>
          <div className="flex space-x-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2"
            /> Kobieta
          </div>
        </label>

        <br />

        <label>
          Kraj:
          <select
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Wybierz kraj</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}{' '}
                <countryList countryCode={country.code} width="15" height="10" />
              </option>
            ))}
          </select>
        </label>  
        <br />

        <label>
          Akceptuję regulamin:
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-2 mr-2"
          />
        </label>

        <br />

        <label>
          Zgoda na marketing:
          <input type="checkbox" id="marketingConsent" className="mt-2 mr-2" />
        </label>

        <br />

        <button type="submit" className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};
export default RegistrationForm;