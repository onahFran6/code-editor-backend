interface PythonTemplates {
  [key: string]: string;
}

const pythonTemplates: PythonTemplates = {
  'Two Sum': `
  input = """"{{input}}""""
  nums, target = map(eval, input.split('\\n'))
  {{code}}
  print(twoSum(nums, target))
  `,
  'Reverse String': `
  input = """{{input}}""".strip().split()
  {{code}}
  reverseString(input)
  print(input)
  `,
};

export default pythonTemplates;
