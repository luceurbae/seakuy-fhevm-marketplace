export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_PINATA_JWT`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload to IPFS");
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    throw error;
  }
};

export const uploadMetadataToIPFS = async (metadata: NFTMetadata): Promise<string> => {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_PINATA_JWT`,
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error("Failed to upload metadata to IPFS");
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    throw error;
  }
};

export const resolveIPFSUrl = (ipfsUrl: string): string => {
  if (ipfsUrl.startsWith("ipfs://")) {
    return ipfsUrl.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return ipfsUrl;
};

export const createNFTMetadata = (
  name: string,
  description: string,
  imageUrl: string,
  attributes?: Array<{ trait_type: string; value: string | number }>
): NFTMetadata => {
  return {
    name,
    description,
    image: imageUrl,
    attributes: attributes || [],
  };
};
