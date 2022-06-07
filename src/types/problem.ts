type TestCase = {
  count: number,
  input: string,
  output: string,
};

type Problem = {
  _id?: string,
  title: string;
  statement: string;
  input: string;
  output: string;
  sampleTestCases: TestCase;
  testCases: TestCase;
};

export default Problem;
