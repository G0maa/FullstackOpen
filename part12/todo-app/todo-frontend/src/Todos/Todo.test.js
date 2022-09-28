import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

const mockOnDelete = jest.fn();
const mockOnComplete = jest.fn();

test("Renders undone todo", () => {
  const todo = {
    text: "I should buy a new SSD",
    done: false,
  };

  render(
    <Todo
      todo={todo}
      onClickComplete={mockOnComplete}
      onClickDelete={mockOnDelete}
    />
  );

  const text = screen.getByText("I should buy a new SSD");
  const isDone = screen.getByText("This todo is not done");
  expect(text).toBeDefined();
  expect(isDone).toBeDefined();
});

test("Renders done todo", () => {
  const todo = {
    text: "Try a new food recipe",
    done: true,
  };

  render(
    <Todo
      todo={todo}
      onClickComplete={mockOnComplete}
      onClickDelete={mockOnDelete}
    />
  );

  const text = screen.getByText("Try a new food recipe");
  const isDone = screen.getByText("This todo is done");
  expect(text).toBeDefined();
  expect(isDone).toBeDefined();
});
