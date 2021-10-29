// require the express module
import express from "express";
import Assignment from "../models/Assignment";

// create a new Router object
const gradeRouter = express.Router();

let assignments: Assignment[] = [
  {
    name: "Walrus Worksheet",
    score: 9,
    total: 10,
    completed: true,
    id: 1,
  },
  {
    name: "Jellyfish Project",
    score: 15,
    total: 15,
    completed: true,
    id: 2,
  },
  {
    name: "Dolphin Quiz",
    score: 8,
    total: 10,
    completed: true,
    id: 3,
  },
  {
    name: "Oceans Unit Test",
    score: 0,
    total: 25,
    completed: false,
    id: 4,
  },
];

let nextId = 5;

gradeRouter.get("/", (req, res) => {
  let scoreAmount = 0;
  let totalAmount = 0;
  assignments.forEach((item) => {
    if (item.completed) {
      scoreAmount += item.score;
      totalAmount += item.total;
    }
  });
  let average = (scoreAmount / totalAmount) * 100;
  res.render("homepage", { assignments, average: average.toFixed(1) });
});

// gradeRouter.post("/", (req, res) => {});

gradeRouter.get("/grades/add", (req, res) => {
  res.render("add-assignment");
});

gradeRouter.post("/grades/add-submit", (req, res) => {
  const { name, score, total, completed } = req.body;
  const newAssignment: Assignment = {
    name,
    score,
    total,
    completed: completed === "on",
    id: nextId++,
  };

  assignments.push(newAssignment);
  console.log(assignments);
  res.render("add-confirmation", newAssignment);
});

gradeRouter.get("/grades/:id/delete", (req, res) => {
  const id: number = parseInt(req.params.id);
  console.log(id);
  const index: number = assignments.findIndex((item) => item.id === id);
  const foundAssignment: Assignment = assignments[index];
  console.log(foundAssignment);
  assignments.splice(index, 1);
  res.render("delete-confirmation", foundAssignment);
});
gradeRouter.get("/grades/:id/edit", (req, res) => {
  const id: number = parseInt(req.params.id);
  console.log(id);
  const index: number = assignments.findIndex((item) => item.id === id);
  const foundAssignment: Assignment = assignments[index];
  console.log(foundAssignment);
  res.render("edit-assignment", foundAssignment);
});

gradeRouter.post("/grades/:id/edit-submit", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index: number = assignments.findIndex((item) => item.id === id);
  const { name, score, total, completed } = req.body;
  const updatedAssignment: Assignment = {
    name,
    score,
    total,
    completed: completed === "on",
    id: nextId++,
  };
  assignments[index] = updatedAssignment;
  res.render("edit-confirmation", updatedAssignment);
});

export default gradeRouter;
