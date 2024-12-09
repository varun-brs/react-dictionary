import React, { useState, useContext } from "react";
import { HttpGet } from "../core/store/httpHelper";
import ReactAudioPlayer from "react-audio-player";
// import { AppContext } from "../core/store/app-context";

export const Home = () => {
  const [wordDetails, setWordDetails] = useState(null);
  const [noDefinitionFound, setNoDefinitionFound] = useState(null);
  const [wordAudio, setAudio] = useState(null);

  //   const { HttpGet } = useContext(AppContext);

  const getWordDetails = async (event) => {
    event.preventDefault();
    try {
      if (event.target.search.value) {
        setNoDefinitionFound(null);
        let wordData = await HttpGet(event.target.search.value);
        setWordDetails(wordData[0]);
        let audioSrc =
          wordData[0].phonetics?.filter((e) => e?.audio !== "")[0]?.audio ||
          null;
        setAudio(audioSrc);
      }
    } catch (err) {
      setWordDetails(null);
      setAudio(null);
      setNoDefinitionFound(err?.response?.data?.title);
    }
  };

  return (
    <>
      <div className="row m-0 justify-content-lg-center">
        <div className="col col-4 mt-4">
          <div className="input-group mb-3">
            <form onSubmit={getWordDetails}>
              <input
                name="search"
                type="text"
                className="form-control shadow-none"
                placeholder="Search for a word..."
                aria-label="Search for a word..."
                aria-describedby="img-search"
                autoFocus
                autoComplete="false"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="row m-0 justify-content-lg-center">
        <div className="col col-6 mt-4 text-center">
          {wordDetails && (
            <>
              <h1 className="f-bold">{wordDetails?.word}</h1>
              {wordAudio && (
                <ReactAudioPlayer
                  controls
                  controlsList={"nodownload"}
                  src={wordAudio}
                />
              )}
              <h3>{wordDetails?.phonetic}</h3>
              {wordDetails?.meanings?.map((e, i) => {
                return (
                  <React.Fragment key={i}>
                    <h3>{e.partOfSpeech}</h3>
                    <h5>{e.definitions[0]?.definition}</h5>
                    <h5>{e.definitions[0]?.example}</h5>
                  </React.Fragment>
                );
              })}
            </>
          )}
          {noDefinitionFound && (
            <h2 className="text-danger">{noDefinitionFound}</h2>
          )}
        </div>
      </div>
    </>
  );
};
