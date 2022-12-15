import { useContext } from "react";
import { MovementsContext } from "../features/MovementsProvider";

const useMovements = () => useContext(MovementsContext);

export default useMovements;