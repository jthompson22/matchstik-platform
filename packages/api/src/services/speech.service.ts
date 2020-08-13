import IFile from '../models/interfaces/IFile';
import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';
import {
  GCP_BUCKET_NAME,
} from '../env';

import * as nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { SENDGRID_API_KEY, DEBUG_ENABLED } from "./../env";
import IEmailService, {
  ISendUserPasswordResetEmailRequest,
  ISendUserPasswordResetEmailResponse,
  ISendUserEmailVerificationEmailRequest,
  ISendUserEmailVerificationEmailResponse
} from "../models/interfaces/IEmailService";
import { toError } from "../models/interfaces/common";
import StatusCodeEnum from "../models/enums/StatusCodeEnum";


export default class SpeechService {
  private client;

  constructor() {
    this.client = new SpeechClient();
    // this.go();
  }

  private go = async(): Promise<any>  => {
    // The name of the audio file to transcribe
    // const fileName = '/Users/samheutmaker/desktop/juice/src/matchstik/files/short-test.mp3';

    // // Reads a local audio file and converts it to base64
    // const file = fs.readFileSync(fileName);
    // const audioBytes = file.toString('base64').slice(0, 10485759);
    

    // console.log(audioBytes.length);

    // // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    // const audio = {
    //   uri: 'gs://matchstik-audio-development/test.mp3'
    // };
    // const config = {
    //   enableWordTimeOffsets: true,
    //   encoding: 'MP3',
    //   sampleRateHertz: 16000,
    //   languageCode: 'en-US',
    // };
    // const request = {
    //   audio: audio,
    //   config: config,
    // };

    // Detects speech in the audio file
    // const [operation] = await this.client.longRunningRecognize(request);
    // const [response] = await operation.promise();

    // fs.writeFileSync('/Users/samheutmaker/desktop/juice/src/matchstik/files/results1.json', JSON.stringify(response));

    // const transcription = response.results
    //   .map(result => result.alternatives[0].transcript)
    //   .join('\n');
    // console.log(`Transcription: ${transcription}`);

  }


  // public sendUserEmailVerificationEmail = async (
  //   request: ISendUserEmailVerificationEmailRequest
  // ): Promise<ISendUserEmailVerificationEmailResponse> => {
  //   let response: ISendUserEmailVerificationEmailResponse = {
  //     status: StatusCodeEnum.UNKNOWN_CODE
  //   };
  //   try {
  //     await this.sendEmail(
  //       EEmailTemplates.VerifyEmail,
  //       "Matchstik - Verify your account",
  //       request.toAddress,
  //       {
  //         verifyEmailUrl: request.verifyEmailUrl
  //       }
  //     );
  //   } catch (e) {
  //     response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
  //     response.error = toError(e.message);
  //     return response;
  //   }
  //   response.status = StatusCodeEnum.OK;
  //   return response;
  // };
}


10485760
42709916