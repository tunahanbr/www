import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from './Icon'; // Adjust the import path as needed
import PocketBase from 'pocketbase'


function Project({ id, collectionId,image = "https://placehold.co/600x400", title = "Project Title", icons = []}) {
  // Construct the URL dynamically
  const [imageUrl, setImageUrl] = useState();

  useEffect = async () => {
    const authData = await pb.admins.authWithPassword(
      import.meta.env.VITE_PB_EMAIL,
      import.meta.env.VITE_PB_PASSWORD
    );
    setImageUrl(`https://www-db.tunahan.at/api/files/${collectionId}/${id}/${image}`)
    pb.authStore.clear();
  }

  return (
    <Link to={`/projects/${id}`} className="flex w-full max-w-[18rem] flex-col rounded-xl bg-white text-gray-700 transform transition-transform duration-300 hover:scale-101">
      {/* Image source */}
      <div className="relative mx-4 mt-6 overflow-hidden text-white rounded-xl transform transition-transform duration-300 hover:-translate-y-1">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-30 object-cover transform transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white from-5%" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h5 className="block font-sans text-lg antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
            {title}
          </h5>
        </div>
        <div className="inline-flex flex-wrap items-center gap-2 mt-4 group">
          {icons.map((icon, index) => (
            <span 
              key={index}
              className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-2 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
            >
              <Icon src={icon} alt={`icon-${index}`} />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

Project.propTypes = {
  id: PropTypes.string.isRequired, // Ensure id is passed as a prop
  image: PropTypes.string,
  title: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.string), // Array of icon file paths
  collectionId: PropTypes.string.isRequired // Ensure collectionId is passed as a prop
};

export default Project;
