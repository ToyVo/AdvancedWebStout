import Axios from 'axios'
import React, { useState } from 'react'
import AddProjectButton from './AddProjectButton.jsx'
import Banner from './Banner.jsx'
import ProjectDetailsModal from './ProjectDetailsModal.jsx'
import ProjectGrid from './ProjectGrid.jsx'

export default function App () {
  const [projectsData, setProjectsData] = useState([])
  const [activeProject, setActiveProject] = useState(null)

  if (projectsData.length === 0) {
    /**
     * fetch all data from server on mount
     */
    Axios.get('/api/projects')
      .then((results) => {
        setProjectsData(results.data)
      })
      .catch((e) => {
        console.error('unable to retrieve projects')
        console.error(e.message)
      })
  }

  /**
   * set the active project for use in the project details modal
   * @param {string} _id the id of the project from mongo
   */
  const retrieveActiveProject = (_id) => {
    Axios.get(`/api/projects/${_id}`)
      .then((results) => {
        setActiveProject(results.data)
      })
      .catch((e) => {
        console.error('error retrieving project data')
        console.error(e.message)
      })
  }

  /**
   * removes a project from state
   * @param {string} _id from mongo
   */
  const deleteProject = (_id) => {
    setProjectsData(projectsData.filter(project => project._id !== _id))
  }

  /**
   * add submitted project to state
   * @param {{
   * _id: string,
   * creator: string,
   * fileURLs: string[],
   * imageURLs: string[],
   * name: string,
   * publishDate: Date,
   * updateDate: Date
    }} project to be submitted to the database
   */
  const submitProject = (project) => {
    setProjectsData([...projectsData, project])
  }

  return (
    <div>

      <Banner title='Project Browser'>
        Click on a project for more information
      </Banner>
      <ProjectGrid
        projectsData={projectsData}
        activeProjectCallback={retrieveActiveProject}
      />
      <AddProjectButton submitProject={submitProject}/>
      {activeProject && <ProjectDetailsModal onCloseDetailsModal={() => setActiveProject(null)} deleteProject={deleteProject}
        project={activeProject}/>}
    </div>
  )
}
