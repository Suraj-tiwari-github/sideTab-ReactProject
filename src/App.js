import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
//* added proxy inside package.json file and provided a relative path.
//"proxy": "https://course-api.com",

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/react-tabs-project");
      const newJobs = res.data;
      setJobs(newJobs);
      // console.log(newJobs);
      setLoading(false);
    } catch (error) {
      console.log("Error Fetching Jobs: ", error);
      setLoading(false);
    }
    // const res=await fetch(url);
    // const newJobs=await res.json();
    // setJobs(newJobs);
    // console.log(setJobs);
    // setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center ">
        {/* Btn container */}
        <div className="btn-container">
          {jobs.map((item,index)=>{
            return <button key={item.id} onClick={()=>setValue(index)} className={`job-btn ${index===value && 'active-btn'}`}>
              {item.company}
            </button> 
          })}
        </div>
        {/* Job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
