import { useState } from 'react'
import Modal from 'react-modal'
import './App.css'

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [weekday, setWeekday] = useState([]);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isHidden, setIsHidden] = useState(true);

  // State variables for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);



  // Function to handle form submission
  const handleSubmit = (e) => {
    setIsHidden(false);    
    e.preventDefault();
    if (!name || !email || !contact || weekday.length === 0 || !gender || !dob) {
      alert('Please fill out all required fields.');
      return;
    }
    // Perform actions with form data (e.g., send to server)
    const newData={
      name,
      email,
      contact,
      weekday: weekday.join(', '), 
      gender,
      dob
    };

    setTableData([...tableData, newData]);

    setName('');
    setEmail('');
    setContact('');
    setWeekday([]);
    setGender('');
    setDob('');
  };


  const handleEdit = (index) => {
    setEditIndex(index);
    // Set the form fields with data from the selected row
    const rowData = tableData[index];
    setName(rowData.name);
    setEmail(rowData.email);
    setContact(rowData.contact);
    setWeekday(rowData.weekday.split(', ')); // Convert string to array
    setGender(rowData.gender);
    setDob(rowData.dob);
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (value) => {
    if (weekday.includes(value)) {
      // If the value is already in the array, remove it
      setWeekday(weekday.filter(day => day !== value));
    } else {
      // If the value is not in the array, add it
      setWeekday([...weekday, value]);
    }
  };

  const handleModalSubmit = () => {
    const updatedData = [...tableData];

    updatedData[editIndex] = {
      name,
      email,
      contact,
      weekday: weekday.join(', '),
      gender,
      dob
    };
    setTableData(updatedData);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  

  return (
    <div id="main-div">
    <h1>Form</h1>
    <form onSubmit={handleSubmit}>
      <label>
      <div className='input-container'>  
        <p>Name:</p>
        <input className="inp-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      </label>



      <label>
      <div className='input-container'>
      <p>Email:</p>
        <input className="inp-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </label>



      <label>
      <p>Contact:</p>
        <input className="inp-field" type="number" value={contact} onChange={(e) => setContact(e.target.value)} />
      </label>



      <label id="weekday-label">
      <p>Weekday:</p>
        <input type="checkbox" value="Monday" checked={weekday.includes('Monday')} onChange={() => handleCheckboxChange('Monday')} /> <span className='days'>Monday</span>
        <input type="checkbox" value="Tuesday" checked={weekday.includes('Tuesday')} onChange={() => handleCheckboxChange('Tuesday')} /> <span className='days'>Tuesday</span>
        <input type="checkbox" value="Wednesday" checked={weekday.includes('Wednesday')} onChange={() => handleCheckboxChange('Wednesday')} /> <span className='days'>Wednesday</span>
        <input type="checkbox" value="Thursday" checked={weekday.includes('Thursday')} onChange={() => handleCheckboxChange('Thursday')} /> <span className='days'>Thursday</span>
        <input type="checkbox" value="Friday" checked={weekday.includes('Friday')} onChange={() => handleCheckboxChange('Friday')} /> <span className='days'>Friday</span>
      </label>



      <label>
      <p>Gender:</p>
        <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} /> <span className='days'>Male</span>
        <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} /> <span className='days'>Female</span>
      </label>



      <label>
      <p>Date of Birth:</p>
        <input className="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </label>

      <br />
      <div id="button-div">
        <button className='submit-btn' type="submit">Submit</button>
      </div>
    </form>

    <h1>Table</h1>
    <table id="table" className={isHidden ? 'hidden':''}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Weekday</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.contact}</td>
              <td>{data.weekday}</td>
              <td>{data.gender}</td>
              <td>{data.dob}</td>
              <td>
                <button className="table-btn" onClick={() => handleEdit(index)}>Edit</button>
                <button className="table-btn" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal  isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <div className="modal">
        <h2>Edit Entry</h2>
        <form onSubmit={handleModalSubmit}>
        <h2>Edit Entry</h2>
  
    <label >
      <p>Name:</p>
      <input className="inp-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </label>

    <br />

    <label>
    <p>Email:</p>
      <input className="inp-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>

    <br />

    <label>
    <p>Contact:</p>
      <input className="inp-field" type="number" value={contact} onChange={(e) => setContact(e.target.value)} />
    </label>

    <br />

    <label >
    <p>Weekday:</p>
      <input type="checkbox" value="Monday" checked={weekday.includes('Monday')} onChange={() => handleCheckboxChange('Monday')} /> <span className='days'>Monday</span>
      <input type="checkbox" value="Tuesday" checked={weekday.includes('Tuesday')} onChange={() => handleCheckboxChange('Tuesday')} /> <span className='days'>Tuesday</span>
      <input type="checkbox" value="Wednesday" checked={weekday.includes('Wednesday')} onChange={() => handleCheckboxChange('Wednesday')} /> <span className='days'>Wednesday</span>
      <input type="checkbox" value="Thursday" checked={weekday.includes('Thursday')} onChange={() => handleCheckboxChange('Thursday')} /> <span className='days'>Thursday</span>
      <input type="checkbox" value="Friday" checked={weekday.includes('Friday')} onChange={() => handleCheckboxChange('Friday')} /> <span className='days'>Friday</span>
    </label>

    <br />

    <label >
      <p>Gender:</p>
      <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} /> <span className='days'>Male</span>
      <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} /> <span className='days'>Female</span>
    </label>

    <br />

    <label>
    <p>Date of Birth:</p>
      <input className="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
    </label>

    <br />

    <button className="submit-btn" type="submit">Save Changes</button>
  </form>

  </div>
      </Modal>


    </div>
  )
}

export default App;