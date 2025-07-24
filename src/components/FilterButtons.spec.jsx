import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterButtons from "./FilterButtons";

describe("FilterButtons Component", () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear(); // Reset mock before each test
    });

    test("renders all filter buttons", () => {
        const { getByTestId } = render(
            <FilterButtons currentFilter="All" onChange={mockOnChange} />
        );

        expect(getByTestId("filter-all")).toBeInTheDocument();
        expect(getByTestId("filter-active")).toBeInTheDocument();
        expect(getByTestId("filter-completed")).toBeInTheDocument();
    });

    test("calls onChange with correct label when buttons are clicked", () => {
        const { getByTestId } = render(
            <FilterButtons currentFilter="All" onChange={mockOnChange} />
        );

        fireEvent.click(getByTestId("filter-active"));
        expect(mockOnChange).toHaveBeenCalledWith("Active");

        fireEvent.click(getByTestId("filter-completed"));
        expect(mockOnChange).toHaveBeenCalledWith("Completed");
    });

    test("adds 'active' class to the current filter button", () => {
        const { getByTestId } = render(
            <FilterButtons currentFilter="Active" onChange={mockOnChange} />
        );

        expect(getByTestId("filter-active")).toHaveClass("active");
        expect(getByTestId("filter-all")).not.toHaveClass("active");
        expect(getByTestId("filter-completed")).not.toHaveClass("active");
    });
});