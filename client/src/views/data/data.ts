interface Idata{
  id: number;
  planTitle: string;
  startTime: string;
  endTime: string;
  content: string;
  date: string;
}

export const initialData: Idata[] = [
  {
    id: 3,
    planTitle: "テスト",
    startTime: "11:00",
    endTime: "15:00",
    content: "鶏肉を下処理して、漬け込む",
    date: "2020-3-12",
  },
  {
    id: 3,
    planTitle: "テスト2",
    startTime: "11:00",
    endTime: "15:00",
    content: "買い出し",
    date: "2020-3-15"
  }
];