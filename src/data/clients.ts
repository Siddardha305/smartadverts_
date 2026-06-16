export interface ClientChannel {
  name: string;
  image: string;
  subscribers?: string;
  highlightSide?: 'left' | 'right';
}

export const CLIENT_CHANNELS: ClientChannel[] = [
  { name: 'Abhigna Reddy Lakkireddy', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583125/Abhignareddy-Lakkireddy_mwcdcz.jpg' },
  { name: 'Amrutha Sandhadi', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583124/Amrutha-Sandhadi_jw755q.jpg', subscribers: '5k Sub', highlightSide: 'right' },
  { name: 'Bhanu Priyanka', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583126/Bhanu-Priyanka_tshglr.jpg' },
  { name: 'Divya Vlogs', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583126/divyavlogs_p24v3p.jpg', subscribers: '1.8 Million', highlightSide: 'left' },
  { name: 'Juhith Vlogs', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583127/juhithvlogs_gyfjo5.jpg' },
  { name: 'Koilamma Vlogs', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583127/Koilamma_Vlogs_yxo0dz.jpg' },
  { name: 'Likitha in Canada', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583129/likitha-in_canada_cke1d3.jpg' },
  { name: 'Pranavi Anakali', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583128/Pranavi-Anakali_mpzpgh.jpg' },
  { name: 'Sarcastic Sai', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583129/Sarcastic-Sai_extydm.jpg', subscribers: '2.5 Million', highlightSide: 'left' },
  { name: 'Sha Vlogs', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583129/shavlogs_nvtntu.jpg' },
  { name: 'Siri Chall Official', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583130/Siri-chall-Official_qpdki3.jpg', subscribers: '500k Sub', highlightSide: 'right' },
  { name: 'Siri Chowdary', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583130/Siri-chowdary_bs1rom.jpg' },
  { name: 'Vani Styles & Vlogs', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583126/Vani-styles_vlogs_ksn12c.jpg' },
  { name: 'Vishnu Kudumula', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583124/VISHNU-KUDUMULA_o5uqe1.jpg' },
  { name: 'Walk With Deepu', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583123/WALK-WITH-DEEPU_omd2yu.jpg', subscribers: '1.8 Million', highlightSide: 'right' },
  { name: 'Samyana Kathalu', image: 'https://res.cloudinary.com/drfiuipgl/image/upload/v1781583761/Samyana_Kathalu_b3jbea.jpg', subscribers: '650k sub' }
];
