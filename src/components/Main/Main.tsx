import React, { useEffect, useState } from 'react'
import { AlbumModel } from '../../models/AlbumModel';
import { PhotoModel } from '../../models/PhotoModel';
import { Switch, Route } from 'react-router';
import * as api from '../../api';
import { AlbumList } from '../Album';
import { PhotoList } from '../Photo';
import { Message } from 'semantic-ui-react'

const Main = () => {
    const [albums, setAlbums] = useState<AlbumModel[]>([]);
    const [photos, setPhotos] = useState<PhotoModel[]>([]);

    useEffect(() => {

        //@ts-ignore
        const localAlbums = JSON.parse(localStorage.getItem('albums') !== null ? localStorage.getItem('albums') : "[]");

        //@ts-ignore
        let localPhotos = JSON.parse(localStorage.getItem('photos') !== null ? localStorage.getItem('photos') : "[]");

        if (localPhotos.length) {
            localPhotos = JSON.parse(localPhotos);
            setPhotos(localPhotos);
        }
        else {
            const photosResponse = api.getPhotos();
            setPhotos(photosResponse);
        }
        if (localAlbums?.length) {
            setAlbums(localAlbums);
        } else {
            const albumResponse = api.getAlbums();
            setAlbums(albumResponse);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'albums', JSON.stringify(albums)
        );
    }, [albums]);

    useEffect(() => {
        localStorage.setItem(
            'photos', JSON.stringify(photos)
        );
    }, [photos]);

    const createAlbum = (album: AlbumModel) => {
        const timestamp = Date.now();
        album.id = `album=${timestamp}`;
        setAlbums(prevAlbums => [...prevAlbums, album]);
    }

    const editAlbum = (key: string, updatedAlbum: AlbumModel) => {
        const updatedAlbums = albums.map(album => album.id === key ? updatedAlbum : album);
        setAlbums(updatedAlbums);
    }

    const deleteAlbum = (key: string) => {
        const updatedAlbums = albums.filter(album => album.id !== key);
        setAlbums(updatedAlbums);
    }

    const createPhoto = (photo: PhotoModel) => {
        const timestamp = Date.now();
        photo.id = `photo=${timestamp}`;
        setPhotos(prevPhotos => [...prevPhotos, photo]);
    }

    const editPhoto = (key: string, updatedPhoto: PhotoModel) => {
        const updatedPhotos = photos.map(photo => photo.id === key ? updatedPhoto : photo);
        setPhotos(updatedPhotos);
    }

    const deletePhoto = (key: string) => {
        const updatedPhotos = photos.filter(photo => photo.id !== key);
        setPhotos(updatedPhotos);
    }

    const albumList = () => <AlbumList
        albums={albums}
        photos={photos}
        deleteAlbum={deleteAlbum}
        editAlbum={editAlbum}
        createAlbum={createAlbum}
    />;

    const photoList = () => <PhotoList
        photos={photos}
        deletePhoto={deletePhoto}
        editPhoto={editPhoto}
        createPhoto={createPhoto}
    />;

    const error = () => <Message
        icon="warning circle"
        header="Ups...Error!"
        content="Please go back and try again."
    />;

    return (
        <Switch>
            <Route exact path="/" component={albumList} />
            <Route path="/albums" render={albumList} />
            <Route path="/photos" render={photoList} />
        </Switch>
    )

}

export default Main