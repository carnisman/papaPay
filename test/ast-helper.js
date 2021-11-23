// Novel way to drive behavior of Smart Contract.

// 
const CDTYPE = "ContractDefinition";
const CNAME = "PapaPay";
const contractDefn = ca =>
  ca.ast.nodes.find(n => n.nodeType === CDTYPE && n.name === CNAME);

const papas = (ca) => {
  const papa = contractDefn(ca).nodes.find((n) => n.name === "Papa");
  if (!papa) return null;

  return papa
    .members
    .map((t) => ({
      name: t.name,
      nodeType: t.nodeType,
      stateVariable: t.stateVariable,
      type: t.typeName.name,
      mutability: t.typeName.stateMutability,
    }));
};

const isDefined = members => variableName => {
  return members 
    ? members.find((papa) => papa.name === variableName) 
    : null;
};

const isPayable = members => variableName => {
  if (members === undefined) return false;
  const definition = members.find((papa) => papa.name === variableName);
  return definition && definition.mutability === "payable";
};

const isType = members => variableName => type => {
  if (members === undefined) return false;
  const definition = members.find((papa) => papa.name === variableName);
  return definition && definition.type === type;
};

module.exports = {
  papas,
  isDefined,
  isPayable,
  isType,
};