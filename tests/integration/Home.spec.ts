import App from "../../src/App.svelte"
import { render, fireEvent } from "@testing-library/svelte"

it("it works", async () => {
    const { getByText, getByTestId } = render(App)
    const text = getByTestId("home-header")
    expect(text).toHaveTextContent("Home")
})
