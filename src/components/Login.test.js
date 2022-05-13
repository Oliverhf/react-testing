import { fireEvent, render , screen, waitFor } from "@testing-library/react"
import { toBeInTheDocument, toBe, toBeDisabled,ToBeVisible, toHaveTextContent, mock } from "@testing-library/jest-dom"
import Login from './login/Login'


jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: {id: 1, name: "John"}
        })
    }
}))


test("username input should rendered", () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    expect(userInputEl).toBeInTheDocument()
})

test("username input shouldbe empty", () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    expect(userInputEl.value).toBe("")
})

test("username input should change", () => {
    render(<Login />)
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const testValue = "test"

    fireEvent.change(userInputEl, {target: {value: testValue}})
    expect(userInputEl.value).toBe(testValue)
})


test("password input should rendered", () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    expect(passwordInputEl).toBeInTheDocument()
})

test("password input should change", () => {
    render(<Login />)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    const testValue = "test"

    fireEvent.change(passwordInputEl, {target: {value: testValue}})
    expect(passwordInputEl.value).toBe(testValue)
})

test("button should rendered", () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole("button")
    expect(buttonInputEl).toBeInTheDocument()
})

test("button should disabled", () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole("button")
    expect(buttonInputEl).toBeDisabled()
})

test("loading should not be rendered", () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole("button")
    expect(buttonInputEl).not.toHaveTextContent(/please wait/i)
})


test("button should not be disabled when input exist", () => {
    render(<Login />)
    const buttonInputEl = screen.getByRole("button")
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)
    
    const testValue = "test"
    
    fireEvent.change(passwordInputEl, {target: {value: testValue}})
    fireEvent.change(userInputEl, {target: {value: testValue}})

    expect(buttonInputEl).not.toBeDisabled()
})


test("error message should not be visible", () => {
    render(<Login />)
    const errorEl = screen.getByTestId("error")
    expect(errorEl).not.toBeVisible()
})

test("loading should be rendered when click", () => {
    render(<Login />)
    const buttonEl = screen.getByRole("button")
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)

    const testValue = "test"

    fireEvent.change(passwordInputEl, {target: {value: testValue}})
    fireEvent.change(userInputEl, {target: {value: testValue}})
    fireEvent.click(buttonEl)
    expect(buttonEl).toHaveTextContent(/please wait/i)
})



test("loading should be rendered after fetching", async () => {
    render(<Login />)
    const buttonEl = screen.getByRole("button")
    const userInputEl = screen.getByPlaceholderText(/username/i)
    const passwordInputEl = screen.getByPlaceholderText(/password/i)

    const testValue = "test"

    fireEvent.change(passwordInputEl, {target: {value: testValue}})
    fireEvent.change(userInputEl, {target: {value: testValue}})
    fireEvent.click(buttonEl)


    const userItem = await screen.findByText("John")

    expect(userItem).toBeInTheDocument()
})


