import { useState } from 'react'
import './App.css'

const InitialValues = {
  vDate : '',
  vDiagnosis :'',
  pId : ''
}

function SecondTable() {

const [VisitData, setVisitData] = useState(InitialValues);
const [Visits, setVisits] = useState([]);
const [editableVisitsData, setEditableVisitData] = useState({
  isEdit : false,
  visitIndex : null
});

const isFilledFields = VisitData.pId && VisitData.vDate && VisitData.vDiagnosis;

const handleCleanClick = () =>
setVisitData(InitialValues);

const handleSubmitVisit = (e) => {
  e.preventDefault();

if (isFilledFields)
{
  if (editableVisitsData.isEdit)
      {
        const editedVisits = Visits;
        editedVisits.splice(editableVisitsData.visitIndex, 1, VisitData);

        setVisits(editedVisits);

        setEditableVisitData({
        isEdit:false,
        visitIndex:null
        })
      }

      else  
      {
        setVisits((prevState) => [...prevState, VisitData]);
      }
  setVisitData(InitialValues);
}}

const handleRemoveClick = (index) => {
  setVisits(Visits.filter((visit, visitIndex) => visitIndex !== index))
}

const handleEditClick = (data, index) => {
  setVisitData(data);
  setEditableVisitData({
    isEdit:true,
    visitIndex:index
  })
}

console.log('visits:', Visits);

    return (
    <>
      <div className='second-wrapper'>
        <div className='wrapper-content'>
          <div className='table-data'>
            <table className='table'>
              <th className='table'>#</th>
              <th className='table'>Patiend Id</th>        
              <th className='table'>Visit Date</th>
              <th className='table'>Diagnosis</th>
              <th className='table'>Actions</th>



              <tbody>
              {Visits.map((visit, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{visit.pId}</td>
                    <td>{visit.vDate}</td>
                    <td>{visit.vDiagnosis}</td>
                    <td>
                    <button className='edit-action' onClick={()=>handleEditClick(visit, index)}>Edit</button>
                    <button className='delete-action' onClick={()=>handleRemoveClick(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
          <div className='form'>
            <form onSubmit={handleSubmitVisit} onReset={handleCleanClick}>
              <input placeholder='Write patient Id'
              onChange={
                (e) => setVisitData((prevState) => ({
                  ...prevState,
                  pId : e.target.value
                }))} value={VisitData.pId}
              />
              <input placeholder='Write visit Date'
              onChange={
                (e) => setVisitData((prevState) => ({
                  ...prevState,
                  vDate : e.target.value
                }))} value={VisitData.vDate}
              />
              <input placeholder='Write Diagnosis'
              onChange={
                (e) => setVisitData((prevState) => ({
                  ...prevState,
                  vDiagnosis : e.target.value
                }))} value={VisitData.vDiagnosis}
              />
              <div>
                <button type='reset'>Clean</button>
                <button 
                  disabled={!isFilledFields} 
                  type='submit'>
                  {editableVisitsData.isEdit? 'Edit' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    )
}

export default SecondTable
