import db from "../../lib/prismadb";

export const getProjects = async () => {
  return db.project.findMany();
};
