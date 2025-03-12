

export type Day = {
  id: string;
  name: string;
  lessons: lesson[];
};

export type lesson = {
  id: string;
  time: string;
  name: string;
  link?: string;
  times: times[];
  userid: string
};

export type times = {
  time: string;
};
