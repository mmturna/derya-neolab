// Vision: the long-form case for why Derya exists and where it is going.
import type { Metadata } from "next";
import { TextPage } from "../components/text-page";

export const metadata: Metadata = { title: "Vision | Derya" };

export default function Vision() {
  return (
    <TextPage title="The physical world is built by companies most people never hear of.">
      <p>
        Behind every bridge, turbine and hospital there is a manufacturer that machined a part, cast a housing or wound
        a coil. These companies are old, specialised and quietly essential. Their engineering is precise. The work
        around it, the commercial work, still runs on inboxes, spreadsheets and the memory of a few people who have been
        there for thirty years.
      </p>
      <p>
        That memory is the real asset. Which materials a customer accepts. Which tolerances are worth a conversation.
        What a job cost the last time, and why it was won or lost. It lives in people and in decades of documents, and
        it walks out the door when they retire.
      </p>
      <p>
        We think the next generation of industrial companies will keep that knowledge in systems that can read it,
        reason over it and act on it. The people who hold it stay in charge. The systems give each of them the reach of
        a whole department.
      </p>
      <p>
        Derya is building those systems: agents that work beside commercial teams, read what comes in, find what
        matters and prepare the work for a person to judge. Every fact they use points back to where it came from.
        Nothing leaves without a person saying yes.
      </p>
      <p>
        We are starting where industrial companies win or lose their work. Over time we want Derya to be the place
        where a manufacturer&apos;s commercial knowledge lives, and where it compounds instead of fading.
      </p>
    </TextPage>
  );
}
