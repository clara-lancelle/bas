import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditorState, convertToRaw, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'; 
import Ariane from "../Partials/Ariane";
import RichTextEditor from '../Fields/RichTextEditor';
import share from "../../Images/Icons/share.svg";
import arrow from '../../Images/Icons/arrow-right-grey-dark.svg'
import mwLogo from '../../Images/Company/mw-logo-large.png'
import ImageUploader from "../Fields/ImageUploader";

const LinkEditor = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={{ color: 'blue', textDecoration: 'underline' }}>
        {props.children}
      </a>
    );
  };
  
  function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  }
  
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkEditor,
    },
  ]);

export default function OfferDetail() {

    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Assurez-vous que l'état est initialisé

    const ariane = (offerType, offerName, offerId) => {
        if (offerType == 'stage') {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/stage/offres', text: 'Stage' },
                    { url: '/stage/offre/' + offerId, text: offerName },
                    { url: '/stage/offre/' + offerId + '/postuler', text: 'Postuler' },
                ]} />
            )
        } else {
            return (
                <Ariane ariane={[
                    { url: '/', text: 'Accueil' },
                    { text: 'Offres' },
                    { url: '/alternance/offres', text: 'Alternance' },
                    { url: '/alternance/offre/' + offerId, text: offerName },
                    { url: '/alternance/offre/' + offerId + '/postuler', text: 'Postuler' },
                ]} />
            )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editorState) {
            const contentState = editorState.getCurrentContent(); // Récupération du contenu
            const rawContentState = JSON.stringify(convertToRaw(contentState));
            const htmlContent = stateToHTML(contentState); // Transformaton de l'objet en HTML
          } else {
            console.error('EditorState is null');
          }
    };

    return (
        <>
            <div className="bg-light-grey">
                <div className="container flex flex-col pt-3 pb-11">

                    {ariane('stages', 'Assistant Web Marketing', 1)}
                    <div className="mt-18">
                        <div className="p-6 pr-12 border border-white-light bg-white mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <img alt="" src="" className="w-16 h-16 object-contain"></img>
                                    <div className="ms-6">
                                        <h1 className="mb-2 font-semibold text-[32px] leading-8">Assistant Social Media</h1>
                                        <p className="mb-2 text-xl"><span className="font-bold">Mentalworks</span> • Lacroix St ouen • Du 20/05/2024 au 28/08/2024 (39 jours)</p>
                                        <div className="flex">
                                            <div className="pr-2 border-r">
                                                <span className="text-blue-dark tag-contract">Stage</span>
                                            </div>
                                            {/* Affichage des profils métiers */}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-l pl-18 flex items-center text-white font-bold ">
                                    {/* Créer un composant pour le lien */}
                                    <Link to="#" className="flex items-center h-full px-14 py-4 border">
                                        <img src={arrow} width="32px"></img>
                                        <span className="ms-2 text-grey-dark">Retour</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form className="mt-14 pb-18 border-b container flex" onSubmit={handleSubmit}>
                <div className="w-2/3 mr-16">
                    <h2 className="font-semibold text-[32px] text-grey-dark mb-5">Postulez à cette offre de stage</h2>
                    <div className="border-t py-8">
                        <p className="text-2xl text-grey-dark font-semibold mb-8">Vous êtes</p>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/5 flex flex-col">
                                <label className="required font-semibold">Genre</label>
                                <select name="gender" className="input-apply">
                                    <option value={'male'}>Homme</option>
                                    <option value={'female'}>Femme</option>
                                </select>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Prénom</label>
                                <input type="text" name="firstname" className="input-apply" placeholder="Jean"></input>
                            </div>
                            <div className="w-2/5 flex flex-col">
                                <label className="required font-semibold">Nom</label>
                                <input type="text" name="lastname" className="input-apply" placeholder="Dupont"></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Date de naissance</label>
                                <input type="date" name="birthdate" className="input-apply"></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Téléphone mobile</label>
                                <input type="phone" name="firstname" className="input-apply" placeholder="06 70 61 95 99"></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Email</label>
                                <input type="email" name="email" className="input-apply" placeholder="jean.dupont@gmail.com"></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="required font-semibold">Confirmez votre email</label>
                                <input type="email" name="email-confirm" className="input-apply" placeholder="jean.dupont@gmail.com"></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Adresse</label>
                                <input type="text" name="address" className="input-apply" placeholder="12 Avenue du Maréchal Joffre"></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Complément d’adresse</label>
                                <input type="text" name="address-complement" className="input-apply" placeholder="Bat A, apt 7"></input>
                            </div>
                        </div>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Code postal</label>
                                <input type="text" name="zipcode" className="input-apply" placeholder="60200" pattern="[0-9]{5}"></input>
                            </div>
                            <div className="w-1/2 flex flex-col">
                                <label className="font-semibold">Ville</label>
                                <input type="text" name="city" className="input-apply" placeholder="Compiègne"></input>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Adresse de votre site web personnel</label>
                            <input type="text" name="website-url" className="input-apply" placeholder="https://www.jeandupont.fr"></input>
                        </div>
                        <div className="w-full flex flex-col mb-8">
                            <label className="font-semibold">Lien vers votre page Linkedin</label>
                            <input type="text" name="linkedin-url" className="input-apply" placeholder="https://www.linkedin.com/in/jean-dupont"></input>
                        </div>
                        <div className="flex gap-x-[52px] text-grey-dark">
                            <div className="flex gap-x-[10px]">
                                <input type="checkbox" name="is-drivepass"></input>
                                <span className="opacity-70">J’ai le permis de conduire</span>
                            </div>
                            <div className="flex gap-x-[10px]">
                                <input type="checkbox" name="is-handicap"></input>
                                <span className="opacity-70">J’ai une forme de handicap</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t py-8">
                        <p className="text-2xl text-grey-dark font-semibold mb-8">Votre situation actuelle</p>
                        <div className="flex gap-x-[25px] mb-8">
                            <div className="w-1/4 flex flex-col">
                                <label className="required font-semibold">Niveau d'études</label>
                                <select name="graduation" className="input-apply">
                                    <option value={'8'}>Doctorat</option>
                                    <option value={'7'}>Master, DEA, DESS, Mastère, Ingénieur</option>
                                    <option value={'6'}>Maitrise</option>
                                    <option value={'6'}>Licence</option>
                                    <option value={'5'}>BTS, DUT, DEUG, DEUST</option>
                                    <option value={'4'}>BAC, BT, BP+3</option>
                                    <option value={'3'}>CAP, BEP</option>
                                    <option value={'3'}>CPA, CFA</option>
                                    <option value={'2'}>Brevet des collèges</option>
                                    <option value={'1'}>Sans diplôme</option>
                                </select>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label className="font-semibold">Diplôme préparé</label>
                                <select name="graduation-next" className="input-apply">
                                    <option value={'8'}>Doctorat</option>
                                    <option value={'7'}>Master, DEA, DESS, Mastère, Ingénieur</option>
                                    <option value={'6'}>Maitrise</option>
                                    <option value={'6'}>Licence</option>
                                    <option value={'5'}>BTS, DUT, DEUG, DEUST</option>
                                    <option value={'4'}>BAC, BT, BP+3</option>
                                    <option value={'3'}>CAP, BEP</option>
                                    <option value={'3'}>CPA, CFA</option>
                                    <option value={'2'}>Brevet des collèges</option>
                                    <option value={'1'}>Sans diplôme</option>
                                </select>
                            </div>
                            <div className="w-5/12 flex flex-col">
                                <label className="required font-semibold">Nom de l’établissement</label>
                                <input type="text" name="school-name" className="input-apply" placeholder="Lycée Saint-Vincent"></input>
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Nom de la formation préparée</label>
                            <input type="text" name="formation-name" className="input-apply" placeholder="Licence générale informatique, mention développement web "></input>
                        </div>
                        <div className="flex flex-col gap-x-[25px] mb-8">
                            <label className="font-semibold">Vos atouts & motivations pour postuler à cette offre de stage</label>
                            <RichTextEditor name="motivations" className="border-white-light border p-4 h-[150px]" editorState={editorState} setEditorState={setEditorState}></RichTextEditor>
                        </div>
                        <div className="flex items-center gap-x-[10px] pt-8 border-t mb-8">
                            <input type="checkbox" name="is-create-account"></input>
                            <span className="opacity-70">Créer mon compte membre pour éviter de ressaisir ces informations la fois prochaine</span>
                        </div>
                        <button className="w-full btn-blue-dark">Postuler</button>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="pb-5 border-b">
                        <p className="text-2xl text-blue-dark font-semibold mb-4">Votre photo</p>
                        <p className="text-grey-dark mb-4">Ajouter votre photo à votre profil est apprécié par les entreprises et augmente vos chances</p>
                        <ImageUploader/>
                    </div>

                </div>
            </form>
        </>
    )
}