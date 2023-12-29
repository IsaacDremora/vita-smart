import { useState } from 'react'
import './App.css'
import SecondTable from './SecondTable'

const InitialValues = {
  pName : '',
  pSurname: '',
  pLastname : '',
  pBirthDate : '',
  pPhoneNumber : ''
}



function App() {
  const [pData, setpData] = useState(InitialValues);
  const [Patients, setPatients] = useState([]);
  const [editablePatientData, setEditablePatientData] = useState({
    isEdit:false,
    patientIndex:null
  });

const isFilledFields = pData.pName && pData.pSurname && pData.pLastname && pData.pBirthDate && pData.pPhoneNumber;

  const handleSubmitPatient = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editablePatientData.isEdit) {
        const editedData = Patients;
        editedData.splice(editablePatientData.patientIndex, 1, pData)

        setPatients(editedData);

        setEditablePatientData({
          isEdit:false,
          patientIndex:null
        })
      }
      else {
    setPatients((prevState) => [...prevState, pData]);
      }
    setpData(InitialValues);
    }
  }

const handleRemoveClick = (index) => {
    setPatients(Patients.filter((patient, patientIndex) => patientIndex != index)) 
}

const handleCleanClick = () => {
  setpData(InitialValues);
}

const handleEditClick = (data, index) => {
  setpData(data);
  setEditablePatientData({
    isEdit:true,
    patientIndex:index
  })
}

const generateXMLAtIndex = (data, index) => {

  const obj = data[index]; // Получаем объект по индексу
  // Создаем корневой элемент XML
  const rootElement = document.createElement('root');

  // Создаем элемент XML для объекта
  const itemElement = document.createElement('item');

  // Проходимся по каждому свойству объекта
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // Создаем элемент XML для свойства и устанавливаем значение
      const propertyElement = document.createElement(prop);
      propertyElement.textContent = obj[prop];

      // Добавляем элемент свойства в элемент объекта
      itemElement.appendChild(propertyElement);
    }
  }

  // Добавляем элемент объекта в корневой элемент
  rootElement.appendChild(itemElement);

  // Создаем XML-документ
  const xmlDocument = document.implementation.createDocument('', '', null);

  // Добавляем корневой элемент в документ
  xmlDocument.appendChild(rootElement);

  console.log(xmlDocument);

  return(xmlDocument);
  
}

  console.log('patients:', Patients)

  return (
    <>
      <div className='wrapper'>
        <div className='wrapper-content'>
          <div className='table-data'>
            <input placeholder='Find patient by name'></input>
            <button>Find</button>
          <select name='select-order-by'>
            <option disabled selected>Order by</option>
            <option>Patient name</option>
            <option>Patient surname</option>
            <option>Patient lastname</option>
            <option>Birth date</option>
          </select>
            <table className='table'>
              <th className='table'>#</th>
              <th className='table'>Patient Name</th>
              <th className='table'>Patient Surname</th>
              <th className='table'>Patient Lastname</th>
              <th className='table'>Birth Date</th>
              <th className='table'>Phone number</th>
              <th className='table'>Actions</th>



              <tbody>
                {Patients.map((patient, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{patient.pName}</td>
                    <td>{patient.pSurname}</td>
                    <td>{patient.pLastname}</td>
                    <td>{patient.pBirthDate}</td>
                    <td>{patient.pPhoneNumber}</td>
                    <td>
                    <button className='get-xml' onClick={()=>generateXMLAtIndex(Patients, index)}>GetXML</button>
                    <button className='edit-action' onClick={()=>handleEditClick(patient, index)}>Edit</button>
                    <button className='delete-action' onClick={()=>handleRemoveClick(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
          <div className='form'>
            <form onSubmit={handleSubmitPatient} onReset={handleCleanClick}>
              <input placeholder='Write patient name' onChange={
                (e) => setpData((prevState) => ({
                  ...prevState,
                  pName : e.target.value
                }))} value={pData.pName}/>
              <input placeholder='Write patient surname' onChange={
                (e) => setpData((prevState) => ({
                  ...prevState,
                  pSurname : e.target.value
                }))} value={pData.pSurname}/>
              <input placeholder='Write patient lastname' onChange={
                (e) => setpData((prevState) => ({
                  ...prevState,
                  pLastname : e.target.value
                }))} value={pData.pLastname}/>
              <input placeholder='Write patient birth date'onChange={
                (e) => setpData((prevState) => ({
                  ...prevState,
                  pBirthDate : e.target.value
                }))} value={pData.pBirthDate}/>
              <input placeholder='Write patient phone number' onChange={
                (e) => setpData((prevState) => ({
                  ...prevState,
                  pPhoneNumber : e.target.value
                }))} value={pData.pPhoneNumber}/>

              <div className='wrapper-buttons'>
                <button type='reset'>Clean</button>
                <button disabled={!isFilledFields} 
                className = 'submit-button' 
                type='submit'>{editablePatientData.isEdit ? 'Edit' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

