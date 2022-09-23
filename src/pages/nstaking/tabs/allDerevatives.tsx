import { TestTable } from "../components/testTable";
import { MasterValidatorProps } from "../config/interfaces";

interface AllDerevativesProps {
  validators: MasterValidatorProps[];
}
const AllDerevatives = (props: AllDerevativesProps) => {
  return (
    <ValidatorTable validators={props.validators} sortBy="validatorTotal" />
  );
};

export default AllDerevatives;
