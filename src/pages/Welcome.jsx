import React from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

function Welcome() {
  const history = useHistory();

  return (
    <div className="welcome-container">
      <h1>Welcome to TopWords!</h1>
      <br></br>
      <p>
        TopWords is a site where you can learn/practice the most commonly used
        words in a language (though there are other categories as well). Words
        and practice sentences are presented in flash card format, allowing
        quick and easy memorization / review.
      </p>
      <p>
        Currently, TopWords only features German and Russian. I can add more
        languages later if there is demand.
      </p>
      <p>
        TopWords is heavily inspired by Clozemaster (go check it out as well,
        I've been using it for years.) And while we are on that topic, I also
        recommend Duolingo! Go try them both if you haven't already, they are
        free after all!
      </p>
      <br></br>
      <div className="welcome-question">
        <p>"Why did you make TopWords?"</p>
      </div>
      <p>
        The main reason: for my portfolio! I'm currently looking for a job and
        having a good portfolio to showcase one's skill is very important. Since
        I also love language learning, I decided to put my two passions together
        to create this app. Furthermore, while I love Clozemaster, I wanted
        something a little more personlized for my taste. I added a few
        different features to that effect.
      </p>
      <p>
        <strong>P.S.</strong> If you or someone you know is looking for a
        developer, don't be afraid to shoot me an email. I don't bite! (unless
        it's part of the job, of course. I'm a team player!)
      </p>
      <br></br>
      <div className="welcome-question">
        <p>
          "Will you add additional words / categories / languages / features?"
        </p>
      </div>
      <p>If there is demand, of course! I aim to please.</p>

      <br></br>
      <div className="welcome-question">
        <p>"Why are there ads?"</p>
      </div>
      <p>
        To cover any server costs. Also, I'm currently on the job hunt (see
        above) and food aint cheap! Any little bit helps, especially since my
        wife eats twice as much as a normal human. I still love her, though.
      </p>

      <br></br>
      <div className="welcome-question">
        <p>"Hey, where is the gamification? This isn't fun!"</p>
      </div>
      <p>
        I don't believe that language learning is a game. In fact, it's one of
        the most important things you can do. I take it very seriously, as
        serious as a heart attack.
      </p>
      <p>
        Don't believe me? Well let me paint a little picture for you, chuckles.
      </p>
      <p>
        It's a lovely tuesday afternoon and you are just getting home from the
        reverse petting zoo when your phone rings. The caller ID says that it's
        your lovely sweet grandma (who is currently on her yearly trip to
        Columbia), but when you pick up the phone you hear{" "}
        <strong>"Envíanos 40,000,000 pesos, o mataremos a tu abuela"</strong>.
        You try to reason with this angry gentleman, but you don't speak this
        strange moon man language. Despite your best efforts, you fail to calm
        the man and negotiations fail. You hear a gun shot and the line goes
        dead.
      </p>
      <p>That's the last time you'd ever hear from gam gam.</p>
      <p>Still sounds like a game to you? No, I didn't think so.</p>
      <p>
        <strong>Checkmate.</strong>
      </p>
      <p>
        (Disclaimer, TopWords currently does not offer Spanish. Maybe it's best
        for meemaw to get her nose candy somewhere else for the time being.)
      </p>

      <p></p>
      <br></br>
      <p>Well anyway, I hope you enjoy TopWords!</p>
      <Button onClick={() => history.push("/dashboard")}>Get Started!</Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>Questions, comments, or requests? Send me a message!</p>

      <Button onClick={() => history.push("/contactme")}>Contact me</Button>

      <br></br>
      <br></br>
      <p className="footer">© {new Date().getFullYear()} James Quinn.</p>
    </div>
  );
}

export default Welcome;
