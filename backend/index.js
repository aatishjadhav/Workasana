const {initializeDatabase} = require("./db/db.connect");
const Project = require("./models/projects.models");
const Tags = require("./models/tags.models");
const Tasks = require("./models/tasks.models");
const Teams = require("./models/teams.models");
const Users = require("./models/users.models");
initializeDatabase();
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.get("/tasks", async (req, res) => {
  try {
    const getTaks = await Tasks.find();
    if (getTaks) {
      res.status(200).json(getTaks);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { name, project, team, owners, tags, timeToComplete, status } = req.body;
    const addTasks = new Tasks({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status
    });
    await addTasks.save();
    if (addTasks) {
      res
        .status(201)
        .json({ message: "New Task Created successfully", task: addTasks });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataToUpdate = req.body;
    const updatedTasks = await Tasks.findByIdAndUpdate(taskId, dataToUpdate, {
      new: true,
    });
    if (updatedTasks) {
      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTasks });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Tasks.findByIdAndDelete(taskId);
    if (deletedTask) {
      res
        .status(200)
        .json({ message: "Task deleted successfully", task: deletedTask });
    } else {
      res.status(404).json({ error: `task not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/teams", async (req, res) => {
  try {
    const getTeams = await Teams.find();
    if (getTeams) {
      res.status(200).json(getTeams);
    } else {
      res.status(400).json({ message: "Failed to fetch teams" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/teams", async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const addTeams = new Teams({ name, description, members });
    await addTeams.save();
    if (addTeams) {
      res.status(201).json({ message: "New Team added", team: addTeams });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/teams/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataToUpdate = req.body;
    const updatedTeam = await Teams.findByIdAndUpdate(taskId, dataToUpdate, {
      new: true,
    });
    if (updatedTeam) {
      res
        .status(200)
        .json({ message: "Team updated successfully", team: updatedTeam });
    } else {
      res.status(404).json({ message: "Failed to update team" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/teams/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTeam = await Teams.findByIdAndDelete(taskId);
    if (deletedTeam) {
      res
        .status(200)
        .json({ message: "Team deleted successfully", team: deletedTeam });
    } else {
      res.status(404).json({ error: `team not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/project", async (req, res) => {
  try {
    const getAllProjects = await Project.find();
    if (getAllProjects) {
      res.status(200).json(getAllProjects);
    } else {
      res.status(400).json({ message: "Failed to fetch projects" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/project", async (req, res) => {
  try {
    const { name, description } = req.body;
    const addNewProject = new Project({ name, description });
    await addNewProject.save();
    if (addNewProject) {
      res
        .status(201)
        .json({ message: "New Project created", project: addNewProject });
    } else {
      res.status(400).json({ message: "Failed to add new project" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const dataToUpdate = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      dataToUpdate,
      { new: true }
    );
    if (updatedProject) {
      res.status(200).json({
        message: "project updated successfully",
        project: updatedProject,
      });
    } else {
      res.status(404).json({ message: "project not found with this Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) {
      res.status(200).json({
        message: "project deleted successfully",
        project: deletedProject,
      });
    } else {
      res.status(404).json({ error: `project not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const getAllUsers = await Users.find();
    if (getAllUsers) {
      res.status(200).json(getAllUsers);
    } else {
      res.status(400).json({ message: "Failed to fetch users" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const addNewUser = new Users({ name, email });
    await addNewUser.save();
    if (addNewUser) {
      res.status(201).json({ message: "User created", user: addNewUser });
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const dataToUpdate = req.body;
    const updatedUser = await Users.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (deletedUser) {
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ error: `user not found with ID: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

// app.put("/:teamId/add-member-by-name", async (req, res) => {
//   const { name } = req.body;
//   const { teamId } = req.params;

//   try {
//     const user = await Users.findOne({ name: name.trim() });

//     if (!user) {
//       return res.status(404).json({ error: `No user found with name "${name}"` });
//     }

//     const team = await Teams.findByIdAndUpdate(
//       teamId,
//       { $addToSet: { members: user._id } }, // Add user ID if not already present
//       { new: true }
//     ).populate("members");

//     res.json(user); // You can also return updated team if needed
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { name: user.name, email: user.email } });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error});
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await Users.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
