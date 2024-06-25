import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });


 
 test('test no duplicate task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i });
  const dueDate = "06/15/2024";
  fireEvent.change(inputTask, {target: {value: "Duplicate"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element)
  fireEvent.change(inputTask, {target: {value: "Duplicate"}});
  fireEvent.change(inputDate, {target: { dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Duplicate/i);
  expect(check).toBeInTheDocument();
 });


 test('test a submitted task with no due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const element = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "Where's my due date?" } });
  fireEvent.click(element);
  const check = screen.queryByText(/Missing Date/i);
  expect(check).not.toBeInTheDocument();
 });

 test('test a submitted task with missing name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const dueDate = "08/20/2024";
  const element = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const check = screen.queryByText(dueDate);
  expect(check).not.toBeInTheDocument();
 });

 test('test that late tasks should have different colors', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  let dueDate = "06/15/2024";
  fireEvent.change(inputTask, { target: { value: "Eat" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const red = screen.getByTestId(/Eat/i).style.background;
  expect(red).toBe("red");

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  fireEvent.change(inputTask, { target: { value: "Shower" } });
  fireEvent.change(inputDate, { target: { value: "06/30/2024" } });
  fireEvent.click(element);
  const white = screen.getByTestId(/Shower/i).style.background;
  expect(white).toBe("white");
 });
  

 test('test the deletion of a task by checking the box', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/15/2024";
  fireEvent.change(inputTask, { target: { value: "Cook" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const present = screen.getByText(/Cook/i);
  expect(present).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const absent = screen.queryByText(/Cook/i);
  expect(absent).not.toBeInTheDocument();
 });