import { db } from './db';
import {
  setProjects,
  projectLoaded
} from './actions'

export const getProjects = (e) => async(dispatch, getState) => {
  const projects = await db.projects.reverse().toArray();
  dispatch( setProjects(projects) );
};

export const addProject = (project_name) => async(dispatch, getState) => {
  await db.projects.add({project_name: project_name})
  dispatch( getProjects() )
}

export const loadProject = (project_id) => async(dispatch, getState) => {
  const counters = await db.counters.where({project_id: project_id}).toArray();
  const current_project = await db.projects.where({project_id: project_id}).first();

  dispatch( projectLoaded({counters, current_project}) )
}

export const addCounter = (counter) => async (dispatch, getState) => {
  await db.counters.add(counter)
  dispatch ( loadProject(counter.project_id) );
}

export const saveCounter = (counter) => async (dispatch, getState) => {
  console.log(counter);
  await db.counters.put(counter);

  dispatch( loadProject(counter.project_id) );
}

export const deleteCounter = (counter) => async (dispatch, getState) => {
  await db.counters.delete(counter.counter_id);
  dispatch( loadProject(counter.project_id) );
}