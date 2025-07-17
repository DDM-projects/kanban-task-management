# Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Introduction

The "Kanban Task Management" application is a full-stack project management tool. With its intuitive interface and backend, it allows you to easily create and edit boards, columns, tasks and subtasks. Key features:

-   Task management with drag & drop functionality for easily reordering tasks or moving them between columns
-   Form validations for creating and updating boards and tasks
-   CRUD operations for boards and tasks
-   Unit-tested basic components for reliability
-   Built with modern technologies such as React, Redux Toolkit, Ant Design, Styled Components
-   Data storage with REST API and database integration

## Table of contents

-   [Overview](#overview)
    -   [Expected Behaviour](#expected-behaviour)
    -   [Unit tests](#unit-tests)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### Expected Behaviour

-   **Boards**

    -   If there are no boards a "+ Add Example Board" button appears, allowing fetching of an example Board.
    -   If the new board has no columns a "+ Add New Column" button appears; clicking it opens "Edit Board" modal.
    -   Clicking different boards in the sidebar switches to the selected board.
    -   Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
    -   Selecting "Edit Board" from the dropdown menu in the header opens the "Edit Board" modal, where details can be changed.
    -   The dropdown menu is disabled when no board is selected.
    -   The "Delete Board" option in the dropdown menu deletes all columns and tasks after confirmation.

-   **Columns**

    -   Columns are added, updated and removed in the Add/Edit Board modals.
    -   A board needs at least one column before tasks can be added. If no columns exist, the "Add New Task" button in the header is disabled.
    -   After adding at least one column to the board a "+ New Column" button appears; clicking it opens "Edit Board" modal.
    -   Clicking the column color icon allows changing the column's color.

-   **Tasks**

    -   Adding a new task adds it to the bottom of the relevant column.
    -   Updating a task's status moves the task to the bottom of the relevant column.
    -   Dragging a task within a column updates tasks order; dragging a task to a different column updates its status and tasks order.
    -   Double-clicking a task opens "View Task" modal, where you can change its status and mark subtasks as completed.
    -   The dropdown menu in "View Task" modal allows deleting the task and all its subtasks, or editing the task.
    -   The "Edit Task" modal allows updating the task and adding, removing or updating subtasks.

### Unit tests

Unit tests have been created for several components, including Task, Button, Input, Checkbox, Label and Select. These tests were written using React Testing Library and Jest.

To run the tests, use the following command in your terminal:

```bash
yarn test
```

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size (TODO)
-   See hover states for all interactive elements on the page
-   Create, read, update, and delete boards and tasks
-   Receive form validations when trying to create/edit boards and tasks
-   Mark subtasks as complete and move tasks between columns
-   Hide/show the board sidebar
-   Toggle the theme between light/dark modes (TODO)
-   **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
-   **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
-   **Bonus**: Build this project as a full-stack application

### Screenshot

![Project](/src/assets/project.png)

### Links

-   Live Site URL: [Live site URL](https://projekty.tojest.dev/)

## My process

### Built with

-   HTML5
-   CSS3
-   Flexbox
-   REST API
-   [TypeScript](https://www.typescriptlang.org/)
-   [React](https://reactjs.org/) - JS library
-   [Styled Components](https://styled-components.com/) - for styles
-   [Formik](https://formik.org/) - for building and managing forms
-   [Yup](https://yup-docs.vercel.app/) - for form validation
-   [Redux Toolkit](https://redux-toolkit.js.org/) - for managing the global state
-   [Ant Design](https://ant.design/) - for building UI components
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - for unit testing
-   [Jest](https://jestjs.io/) - for unit testing
-   [DnD Kit](https://dndkit.com/) - for drag and drop functionality
-   [Font: Plus Jakarta Sans from Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
-   Kanban methodology - for managing project workflow

### What I learned

-   Managing state using Redux Toolkit
-   Implementing drag-and-drop functionality using DnD Kit
-   Building responsive UIs with React, Ant Design and Styled Components
-   Writing unit tests for React components with React Testing Library and Jest
-   Validating more complex forms effectively with Formik and Yup
-   Managing project workflow with Kanban methodology

## Author

-   Website - [DDM-projects](https://github.com/DDM-projects)

## Acknowledgments

A special thanks goes out to [MP-projects](https://github.com/MP-projects) for creating the backend architecture that powers this application.
