import React, { useContext } from "react";
import { PetaniInterface } from '../../interfaces/petani.interface';
import useAsyncStorage from "../../hooks/useAsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import convertToJson from '../../helpers/convertToJson';
import XLSX from 'xlsx';

interface SideNavContextInterface {
    data: PetaniInterface[],
    handleCacheDatabase: (cb: () => void) => void
    handleClearDatabase: (cb: () => void) => void
}
const databaseContext = React.createContext<SideNavContextInterface>({
    data: [],
    handleCacheDatabase: () => { },
    handleClearDatabase: () => { }
})

const useProvideDatabase = () => {
    const initialValue: string = 'data'
    const [data, setData] = useAsyncStorage<PetaniInterface[]>(initialValue, []);

    const handleCacheDatabase = async (cb: () => void) => {
        // const item: string | null = await AsyncStorage.getItem('data');
        // Gets all files inside of selected directory
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {

            // Gets SAF URI from response
            const uri = permissions.directoryUri;

            // Gets all files inside of selected directory
            const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);

            try {
                const file = await FileSystem.readAsStringAsync(files[0], { encoding: FileSystem.EncodingType.Base64 });
                const wb = await XLSX.read(file.replace(/_/g, "/").replace(/-/g, "+"), { type: 'base64' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_csv(ws);
                setData(convertToJson(data));
                cb()
            } catch (e) {
                alert("Error fetching database. Either the database is missing or format is not .xlsx");
            }
        }
    }

    const handleClearDatabase = (cb: () => void) => {
        AsyncStorage.removeItem(initialValue).then(() => {
            setData([])
            cb()
        })
    }

    return { data, handleCacheDatabase, handleClearDatabase };
}

export function ProvideDatabase({ children }: any) {
    const database = useProvideDatabase()
    return (
        <databaseContext.Provider value={database}>
            {children}
        </databaseContext.Provider>
    );
}

export function useDatabase() {
    return useContext(databaseContext);
}