const updatedFields = <Back = any, Front = any>(
  props: { front: keyof Front; back: keyof Back }[],
  front: Front
) => {
  let error = false;
  let result: Partial<any> = {};

  props.forEach((prop) => {
    if (front[prop.front]) {
      result[prop.back] = front[prop.front];
    }
  });

  if (result === {}) {
    error = true;
  }

  return { error, result };
};

export default updatedFields;
