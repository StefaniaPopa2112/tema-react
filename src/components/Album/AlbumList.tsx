import React from 'react'
import {AlbumModel} from '../../models/AlbumModel'
import {PhotoModel} from '../../models/PhotoModel'
import Album, {AlbumForm} from '../Album';
import {Card, Button, Icon} from 'semantic-ui-react'
import {WithLightbox, DeleteButton} from '../Common';

interface AlbumListProps {
    albums: AlbumModel[];
    photos: PhotoModel[];
    deleteAlbum: (index: string) => void;
    editAlbum: Function;
    createAlbum: Function;
}

const AlbumList = ({albums, photos, deleteAlbum, editAlbum, createAlbum}: AlbumListProps) => {
    const getAlbumPhotos = (album: AlbumModel) => {
        return photos
        .filter(photo => album.photoIds.includes(photo.id));
    }
    const renderAlbums = () => {
        return (
            albums
            .map(album => {
                const albumPhotos = getAlbumPhotos(album);

                return (
                    <Album 
                    key={album.id}
                    album={album}
                    albumPhotos={albumPhotos}>
                        <Button icon>
                            <WithLightbox
                                photos={albumPhotos}>
                                    <Icon name='play' />
                                </WithLightbox>
                        </Button>   
                        <AlbumForm
                        formType='Edit'
                        index={album.id}
                        albumProp={album}
                        photos={photos}
                        editAlbum={editAlbum}
                        createAlbum={createAlbum}
                        />
                        <DeleteButton
                        index={album.id}
                        objectName={album.name}
                        deleteObject={deleteAlbum}
                        />
                    </Album>
                );
            })
        );
    };

    return (
        <div>
            {}
            <Card.Group itemsPerRow={6} doubling>
                {renderAlbums()}
            </Card.Group>
        </div>
    )
}

export default AlbumList;