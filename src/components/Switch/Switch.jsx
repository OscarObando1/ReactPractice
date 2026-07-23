import { Children, isValidElement } from "react";

/**
 * Declarative branch selector. Renders the `<Case>` whose `value` matches the
 * `Switch` value, or the `fallback` when none match. Keeps role/variant based
 * rendering centralized and readable instead of nested ternaries.
 *
 * @example
 * <Switch value={role} fallback={<StudentFields />}>
 *   <Case value="trainer"><TrainerFields /></Case>
 *   <Case value="student"><StudentFields /></Case>
 * </Switch>
 *
 * @param {object} props
 * @param {*} props.value - Value compared against each `<Case value>`.
 * @param {React.ReactNode} props.children - One or more `<Case>` elements.
 * @param {React.ReactNode} [props.fallback=null] - Rendered when nothing matches.
 */
function Switch({ value, children, fallback = null }) {
  const match = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.value === value
  );
  return match ? match.props.children : fallback;
}

/**
 * Marker used inside `<Switch>`. Renders nothing on its own; `Switch` reads its
 * `value` and `children`.
 *
 * @param {object} props
 * @param {*} props.value - The value this case matches.
 * @param {React.ReactNode} props.children - Content rendered when matched.
 */
export function Case({ children }) {
  return children;
}

export default Switch;
